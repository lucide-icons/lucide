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

public val Lucide.Building2: ImageVector
    get() {
        if (_building2 != null) {
            return _building2!!
        }
        _building2 = Builder(name = "Building2", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(6.0f, 22.0f)
                verticalLineTo(4.0f)
                curveToRelative(0.0f, -0.27f, 0.0f, -0.55f, 0.07f, -0.82f)
                arcToRelative(1.477f, 1.477f, 0.0f, false, true, 1.1f, -1.11f)
                curveTo(7.46f, 2.0f, 8.73f, 2.0f, 9.0f, 2.0f)
                horizontalLineToRelative(7.0f)
                curveToRelative(0.27f, 0.0f, 0.55f, 0.0f, 0.82f, 0.07f)
                arcToRelative(1.477f, 1.477f, 0.0f, false, true, 1.11f, 1.1f)
                curveToRelative(0.07f, 0.28f, 0.07f, 0.56f, 0.07f, 0.83f)
                verticalLineToRelative(18.0f)
                horizontalLineTo(6.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(2.0f, 14.0f)
                verticalLineToRelative(6.0f)
                curveToRelative(0.0f, 1.1f, 0.9f, 2.0f, 2.0f, 2.0f)
                horizontalLineToRelative(2.0f)
                verticalLineTo(12.0f)
                horizontalLineTo(4.0f)
                curveToRelative(-0.27f, 0.0f, -0.55f, 0.0f, -0.82f, 0.07f)
                curveToRelative(-0.27f, 0.07f, -0.52f, 0.2f, -0.72f, 0.4f)
                curveToRelative(-0.19f, 0.19f, -0.32f, 0.44f, -0.39f, 0.71f)
                arcTo(3.4f, 3.4f, 0.0f, false, false, 2.0f, 14.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(20.82f, 9.07f)
                arcTo(3.4f, 3.4f, 0.0f, false, false, 20.0f, 9.0f)
                horizontalLineToRelative(-2.0f)
                verticalLineToRelative(13.0f)
                horizontalLineToRelative(2.0f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, false, 2.0f, -2.0f)
                verticalLineToRelative(-9.0f)
                curveToRelative(0.0f, -0.28f, 0.0f, -0.55f, -0.07f, -0.82f)
                curveToRelative(-0.07f, -0.27f, -0.2f, -0.52f, -0.4f, -0.72f)
                curveToRelative(-0.19f, -0.19f, -0.44f, -0.32f, -0.71f, -0.39f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(10.0f, 6.0f)
                horizontalLineToRelative(4.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(10.0f, 10.0f)
                horizontalLineToRelative(4.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(10.0f, 14.0f)
                horizontalLineToRelative(4.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(10.0f, 18.0f)
                horizontalLineToRelative(4.0f)
            }
        }
        .build()
        return _building2!!
    }

private var _building2: ImageVector? = null
