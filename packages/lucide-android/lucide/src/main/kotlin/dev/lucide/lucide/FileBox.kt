package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.FileBox: ImageVector
    get() {
        if (_fileBox != null) {
            return _fileBox!!
        }
        _fileBox = Builder(name = "FileBox", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(14.5f, 22.0f)
                horizontalLineTo(18.0f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, false, 2.0f, -2.0f)
                verticalLineTo(7.5f)
                lineTo(14.5f, 2.0f)
                horizontalLineTo(6.0f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, false, -2.0f, 2.0f)
                verticalLineToRelative(4.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(14.0f, 2.0f)
                lineToRelative(0.0f, 6.0f)
                lineToRelative(6.0f, 0.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(2.97f, 13.12f)
                curveToRelative(-0.6f, 0.36f, -0.97f, 1.02f, -0.97f, 1.74f)
                verticalLineToRelative(3.28f)
                curveToRelative(0.0f, 0.72f, 0.37f, 1.38f, 0.97f, 1.74f)
                lineToRelative(3.0f, 1.83f)
                curveToRelative(0.63f, 0.39f, 1.43f, 0.39f, 2.06f, 0.0f)
                lineToRelative(3.0f, -1.83f)
                curveToRelative(0.6f, -0.36f, 0.97f, -1.02f, 0.97f, -1.74f)
                verticalLineToRelative(-3.28f)
                curveToRelative(0.0f, -0.72f, -0.37f, -1.38f, -0.97f, -1.74f)
                lineToRelative(-3.0f, -1.83f)
                arcToRelative(1.97f, 1.97f, 0.0f, false, false, -2.06f, 0.0f)
                lineToRelative(-3.0f, 1.83f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(7.0f, 17.0f)
                lineToRelative(-4.74f, -2.85f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(7.0f, 17.0f)
                lineToRelative(4.74f, -2.85f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(7.0f, 17.0f)
                verticalLineToRelative(5.0f)
            }
        }
        .build()
        return _fileBox!!
    }

private var _fileBox: ImageVector? = null
