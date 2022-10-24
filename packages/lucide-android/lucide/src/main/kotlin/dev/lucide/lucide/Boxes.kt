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

public val Lucide.Boxes: ImageVector
    get() {
        if (_boxes != null) {
            return _boxes!!
        }
        _boxes = Builder(name = "Boxes", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(2.97f, 12.92f)
                arcTo(2.0f, 2.0f, 0.0f, false, false, 2.0f, 14.63f)
                verticalLineToRelative(3.24f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, false, 0.97f, 1.71f)
                lineToRelative(3.0f, 1.8f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, false, 2.06f, 0.0f)
                lineTo(12.0f, 19.0f)
                verticalLineToRelative(-5.5f)
                lineToRelative(-5.0f, -3.0f)
                lineToRelative(-4.03f, 2.42f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(7.0f, 16.5f)
                lineToRelative(-4.74f, -2.85f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(7.0f, 16.5f)
                lineToRelative(5.0f, -3.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(7.0f, 16.5f)
                verticalLineToRelative(5.17f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(12.0f, 13.5f)
                verticalLineTo(19.0f)
                lineToRelative(3.97f, 2.38f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, false, 2.06f, 0.0f)
                lineToRelative(3.0f, -1.8f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, false, 0.97f, -1.71f)
                verticalLineToRelative(-3.24f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, false, -0.97f, -1.71f)
                lineTo(17.0f, 10.5f)
                lineToRelative(-5.0f, 3.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(17.0f, 16.5f)
                lineToRelative(-5.0f, -3.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(17.0f, 16.5f)
                lineToRelative(4.74f, -2.85f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(17.0f, 16.5f)
                verticalLineToRelative(5.17f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(7.97f, 4.42f)
                arcTo(2.0f, 2.0f, 0.0f, false, false, 7.0f, 6.13f)
                verticalLineToRelative(4.37f)
                lineToRelative(5.0f, 3.0f)
                lineToRelative(5.0f, -3.0f)
                verticalLineTo(6.13f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, false, -0.97f, -1.71f)
                lineToRelative(-3.0f, -1.8f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, false, -2.06f, 0.0f)
                lineToRelative(-3.0f, 1.8f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(12.0f, 8.0f)
                lineTo(7.26f, 5.15f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(12.0f, 8.0f)
                lineToRelative(4.74f, -2.85f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(12.0f, 13.5f)
                verticalLineTo(8.0f)
            }
        }
        .build()
        return _boxes!!
    }

private var _boxes: ImageVector? = null
