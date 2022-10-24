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

public val Lucide.TreeDeciduous: ImageVector
    get() {
        if (_treeDeciduous != null) {
            return _treeDeciduous!!
        }
        _treeDeciduous = Builder(name = "TreeDeciduous", defaultWidth = 24.0.dp, defaultHeight =
                24.0.dp, viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(8.0f, 19.0f)
                horizontalLineToRelative(8.0f)
                arcToRelative(4.0f, 4.0f, 0.0f, false, false, 3.8f, -2.8f)
                arcToRelative(4.0f, 4.0f, 0.0f, false, false, -1.6f, -4.5f)
                curveToRelative(1.0f, -1.1f, 1.0f, -2.7f, 0.4f, -4.0f)
                curveToRelative(-0.7f, -1.2f, -2.2f, -2.0f, -3.6f, -1.7f)
                arcToRelative(3.0f, 3.0f, 0.0f, false, false, -3.0f, -3.0f)
                arcToRelative(3.0f, 3.0f, 0.0f, false, false, -3.0f, 3.0f)
                curveToRelative(-1.4f, -0.2f, -2.9f, 0.5f, -3.6f, 1.7f)
                curveToRelative(-0.7f, 1.3f, -0.5f, 2.9f, 0.4f, 4.0f)
                arcToRelative(4.0f, 4.0f, 0.0f, false, false, -1.6f, 4.5f)
                arcTo(4.0f, 4.0f, 0.0f, false, false, 8.0f, 19.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(12.0f, 19.0f)
                verticalLineToRelative(3.0f)
            }
        }
        .build()
        return _treeDeciduous!!
    }

private var _treeDeciduous: ImageVector? = null
